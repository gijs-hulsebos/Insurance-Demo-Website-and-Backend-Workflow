const test = async () => {
  const data = {
    email: 'test@test.com',
    policyNumber: 'POL-1234567',
    incidentType: 'test',
    incidentDescription: 'test',
    image: '',
    consented: true
  };
  const res = await fetch('https://gijs-hulsebos.app.n8n.cloud/webhook-test/d7c96957-0b16-41b5-8084-dc0bd128301c', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Body:', text);
};
test();
