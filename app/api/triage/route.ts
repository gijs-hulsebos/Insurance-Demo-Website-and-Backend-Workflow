import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('[API] Processing new triage submission, calling n8n backend...');
    
    const rawApiKey = process.env.n8n_api_key;
    const apiKey = rawApiKey?.trim();
    if (!apiKey) {
      console.error('[API] Error: n8n_api_key is missing. Please ensure the n8n_api_key environment variable/secret is set.');
      return NextResponse.json(
        { error: 'n8n API Key is missing. Please ensure the n8n_api_key environment variable/secret is set.' },
        { status: 500 }
      );
    }
    
    console.log('API Key Length:', apiKey.length);

    const res = await fetch('https://gijs-hulsebos.app.n8n.cloud/webhook/d7c96957-0b16-41b5-8084-dc0bd128301c', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'n8n_api_key': apiKey,
      },
      body: JSON.stringify(data),
    });

    const responseText = await res.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      // Handle cases where n8n returns a 200 OK string like "Workflow was started" instead of JSON
      if (res.ok) {
        responseData = { message: responseText, status: 'manual_review_required' };
      } else {
        responseData = { error: 'Unknown payload' };
      }
    }

    if (!res.ok) {
      console.error(`[API] Webhook failed with status: ${res.status}. Body: ${responseText}`);
      
      // If the webhook returned JSON with expected fields (like status or claim_id) despite the error HTTP code,
      // pass it along to the client as a 200 OK so the UI can gracefully show the results/Dashboard.
      // Do not match n8n's internal error which also has 'message' but no claim_id/status.
      if (responseData && typeof responseData === 'object' && !responseData.code && (responseData.status === 'manual_review_required' || responseData.claim_id || responseData.urgency_score)) {
        return NextResponse.json(responseData, { status: 200 });
      }

      let errorMsg = 'Webhook execution failed';
      if (res.status === 404) errorMsg = 'n8n webhook is not active or listening. Make sure to click "Test Workflow" or toggle the workflow to Active.';
      else if (res.status === 403) errorMsg = `n8n authentication failed (403). Sent Header 'n8n_api_key' with a value of length ${apiKey?.length} (starts with: '${apiKey?.substring(0, 4)}...'). Please verify the Header Name in n8n matches EXACTLY and the value matches EXACTLY without extra spaces.`;
      else if (res.status === 500) errorMsg = 'Workflow execution failed inside n8n. Check your n8n execution logs.';

      return NextResponse.json({ error: errorMsg, status: res.status, details: responseText }, { status: res.status });
    }

    if (Array.isArray(responseData) && responseData.length > 0) {
      responseData = responseData[0];
    }
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('[API] Fatal Error during triage processing:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
