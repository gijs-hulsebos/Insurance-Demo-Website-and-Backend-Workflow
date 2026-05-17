'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronDown, 
  Activity, 
  CheckCircle2, 
  FileText,
  Workflow,
  Check,
  Building2,
  FileCheck,
  Cpu,
  ImagePlus,
  X,
  Clock,
  ShieldCheck
} from 'lucide-react';

type ClaimResult = {
  status?: string;
  policy_number?: string;
  urgency_level?: string | number;
  urgency_label?: string | number;
  urgency_reasoning?: string;
  confidence_score?: string;
  confidence?: string;
  technical_summary?: string;
  assessment?: string;
  escalation_required?: string;
  escalation_reasoning?: string;
  next_step?: string;
};

export default function Home() {
  const triageRef = useRef<HTMLDivElement>(null);
  const [submitStage, setSubmitStage] = useState<'idle' | 'verifying' | 'executing' | 'complete'>('idle');
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);
  const [description, setDescription] = useState('');
  const [policyNumber, setPolicyNumber] = useState('POL-');
  const [incidentType, setIncidentType] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  const scrollToTriage = () => {
    triageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStage('executing');
    setClaimResult(null);
    setErrorMsg(null);
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());

    let imageUrl = selectedImage || 'https://placehold.co/600x400.png?text=No+Image+Provided';
    if (imageUrl.startsWith('/')) {
      imageUrl = new URL(imageUrl, window.location.origin).href;
    }

    const data = {
      email: email || '',
      policyNumber: policyNumber || '',
      incidentType: incidentType || '',
      incidentDescription: description || '',
      image: imageUrl,
      consented: isAgreed,
    };

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let responseData;
      try {
        responseData = await res.json();
      } catch (e) {
        throw new Error(`Invalid JSON response from server. Status: ${res.status}`);
      }
      
      if (!res.ok) {
        throw new Error(responseData?.error || `Network response was not ok: ${res.status}`);
      }
      setSubmitStage('complete');
      setClaimResult(responseData as ClaimResult);
    } catch (error: any) {
      console.error('Submission failed', error);
      setSubmitStage('idle');
      setErrorMsg(error.message || 'Systems busy: Connection to Triage Agent failed. Please try again.');
    }
  };

  const getButtonText = () => {
    switch (submitStage) {
      case 'executing': return 'AI Agent Analyzing...';
      case 'complete': return 'Triage Complete';
      default: return 'Submit Claim';
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col w-full bg-slate-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-24 w-full flex flex-col items-center bg-white border-b border-slate-200">
          <div className="text-center max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#00205B] mb-6">
              Claims processing, evolved.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              Our AI execution engine automates triage, categorizes workflows, and assigns claims instantly.
            </p>

            <button 
              onClick={scrollToTriage}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00205B] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-opacity-90 shadow-sm"
            >
              Initiate Agent Triage
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Minimal Process Diagram */}
          <div className="mt-20 w-full max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
              
              {/* Input */}
              <div className="flex flex-col gap-4 z-10 w-full sm:w-1/3">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center gap-3 shadow-sm">
                  <div className="bg-white border border-slate-200 text-slate-600 p-2 rounded-md"><FileText className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Source Data</div>
                    <div className="text-sm font-semibold text-[#00205B]">Unstructured Claim</div>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center gap-3 shadow-sm">
                  <div className="bg-white border border-slate-200 text-slate-600 p-2 rounded-md"><Building2 className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Context</div>
                    <div className="text-sm font-semibold text-[#00205B]">CRM & Policy Data</div>
                  </div>
                </div>
              </div>

              {/* Center Logic */}
              <div className="relative z-10 flex flex-col items-center shrink-0">
                <div className="w-16 h-16 bg-[#00205B] text-white rounded-xl flex items-center justify-center shadow-md mb-3">
                  <Cpu className="h-8 w-8" />
                </div>
                <span className="text-xs font-bold text-[#00205B] tracking-wider uppercase">Agent Core</span>
              </div>

              {/* Output */}
              <div className="flex flex-col gap-4 z-10 w-full sm:w-1/3">
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-center gap-3 shadow-sm">
                  <div className="bg-white border border-emerald-100 text-emerald-600 p-2 rounded-md"><CheckCircle2 className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Verified Result</div>
                    <div className="text-sm font-semibold text-emerald-900">Coverage Active</div>
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex items-center gap-3 shadow-sm">
                  <div className="bg-white border border-indigo-100 text-[#00205B] p-2 rounded-md"><Workflow className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Execution Action</div>
                    <div className="text-sm font-semibold text-indigo-900">Claim Instantiated</div>
                  </div>
                </div>
              </div>
              
              {/* Connection lines */}
              <svg className="hidden sm:block absolute inset-0 w-full h-full text-slate-200 -z-10" preserveAspectRatio="none">
                <path d="M 0 50% L 100% 50%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </section>

        {/* Triage Portal Section */}
        <section ref={triageRef} className="py-24 bg-slate-50 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {!claimResult ? (
                <motion.div 
                  key="form-view"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <div className="p-8 sm:p-10 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#00205B] mb-2">Claim Intake Form</h2>
                      <p className="text-slate-500 text-sm">Please provide the details below or simulate a claim for demo purposes.</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const driveFiles = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_IDS?.split(',') || [];
                        const demoClaims = [
                          {
                            src: `https://drive.google.com/file/d/${driveFiles[1] || ''}/preview`,
                            desc: "I swerved to avoid debris and accidentally backed into a utility pole. The rear bumper is completely dented and the taillight is broken."
                          },
                          {
                            src: `https://drive.google.com/file/d/${driveFiles[4] || ''}/preview`,
                            desc: "A rock fell from the mountain onto my windshield while I was driving and completely shattered it. Luckily no one was hurt, but visibility is zero."
                          },
                          {
                            src: `https://drive.google.com/file/d/${driveFiles[0] || ''}/preview`,
                            desc: "I was rear-ended at a stoplight, which pushed my car into the vehicle in front of me. Extensive front-end damage to the hood and grille."
                          },
                          {
                            src: `https://drive.google.com/file/d/${driveFiles[2] || ''}/preview`,
                            desc: "It was raining heavily, the car hydroplaned, and I ended up sliding off the road into a tree. The front is totally crushed."
                          },
                          {
                            src: `https://drive.google.com/file/d/${driveFiles[3] || ''}/preview`,
                            desc: "I drove over some construction debris on the highway and a large nail severely punctured my front right tire, causing an immediate blowout."
                          },
                          // Low risk examples
                          {
                            src: 'https://placehold.co/600x400/e2e8f0/475569.png?text=Minor+Scratch',
                            desc: "I found a very small scratch on the driver's side door when I returned to my parked car in the grocery store lot. It's barely noticeable and didn't dent the metal."
                          },
                          {
                            src: 'https://placehold.co/600x400/e2e8f0/475569.png?text=Small+Dent',
                            desc: "A stray pebble clinked off my hood while driving on the highway, leaving a tiny pinhole-sized dent and a minor paint chip."
                          },
                          {
                            src: 'https://placehold.co/600x400/e2e8f0/475569.png?text=Scuffed+Wheel',
                            desc: "I accidentally brushed my wheel rim against the curb while parallel parking. The tire is completely fine, just a light cosmetic scuff on the edge of the alloy rim."
                          }
                        ];
                        const randomClaim = demoClaims[Math.floor(Math.random() * demoClaims.length)];

                        const randomNames = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "Chris Wilson", "Sarah Brown"];
                        const generatedName = randomNames[Math.floor(Math.random() * randomNames.length)];

                        setName(generatedName);
                        setEmail(`${generatedName.toLowerCase().replace(' ', '.')}@example.com`);
                        setDescription(randomClaim.desc);
                        setSelectedImage(randomClaim.src);
                        setIncidentType('Vehicle Collision (demo)');
                        const randomNums = Math.floor(1000000 + Math.random() * 9000000).toString();
                        setPolicyNumber(`POL-${randomNums}`);
                      }}
                      className="inline-flex items-center gap-2 rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                    >
                      <Activity className="h-4 w-4" />
                      Simulate Claim
                    </button>
                  </div>
                  
                  <div className="p-8 sm:p-10 bg-slate-50/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-slate-700">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-md border border-slate-300 px-4 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#00205B] focus:ring-1 focus:ring-[#00205B] transition-all focus:outline-none shadow-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-slate-300 px-4 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#00205B] focus:ring-1 focus:ring-[#00205B] transition-all focus:outline-none shadow-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="policyNumber" className="block text-sm font-semibold text-slate-700">Policy Number</label>
                          <input 
                            type="text" 
                            id="policyNumber" 
                            name="policyNumber" 
                            required
                            value={policyNumber}
                            onChange={(e) => setPolicyNumber(e.target.value)}
                            className="w-full rounded-md border border-slate-300 px-4 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#00205B] focus:ring-1 focus:ring-[#00205B] transition-all focus:outline-none shadow-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="incidentType" className="block text-sm font-semibold text-slate-700">Incident Type</label>
                          <div className="relative">
                            <select 
                              id="incidentType" 
                              name="incidentType" 
                              required
                              value={incidentType}
                              onChange={(e) => setIncidentType(e.target.value)}
                              className="w-full appearance-none rounded-md border border-slate-300 px-4 py-2.5 bg-white text-slate-900 focus:border-[#00205B] focus:ring-1 focus:ring-[#00205B] transition-all focus:outline-none shadow-sm"
                            >
                              <option value="">Select an incident type...</option>
                              <option value="Vehicle Collision (demo)">Vehicle Collision (demo)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="description" className="block text-sm font-semibold text-slate-700">Incident Description</label>
                          <textarea 
                            id="description" 
                            name="description" 
                            rows={5}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide details about the incident..."
                            className="w-full rounded-md border border-slate-300 px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#00205B] focus:ring-1 focus:ring-[#00205B] transition-all resize-none focus:outline-none leading-relaxed shadow-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-slate-700">Attachments</label>
                          {selectedImage ? (
                            <div className="relative w-full h-[300px] border border-slate-300 rounded-md overflow-hidden bg-slate-50">
                              {selectedImage.includes('drive.google.com') ? (
                                <iframe src={selectedImage} width="100%" height="100%" allow="autoplay" className="border-0"></iframe>
                              ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={selectedImage} alt="Attachment" className="object-cover w-full h-full" />
                              )}
                              <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white text-slate-700 shadow-sm"
                              >
                                <span className="sr-only">Remove</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <label htmlFor="file-upload" className="flex items-center justify-center w-full min-h-[100px] border-2 border-dashed border-slate-300 rounded-md cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImagePlus className="w-8 h-8 mb-2 text-slate-400" />
                                <p className="text-sm text-slate-500 font-medium">Click or drag image to upload</p>
                                <p className="text-xs text-slate-400 mt-1">PNG, JPG, HEIC up to 10MB</p>
                              </div>
                              <input 
                                id="file-upload" 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setSelectedImage(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col items-end gap-6 border-t border-slate-200 mt-6 pt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
                          <div className="flex items-start gap-3 flex-1">
                            <input 
                              type="checkbox" 
                              id="agreement" 
                              required 
                              checked={isAgreed}
                              onChange={(e) => setIsAgreed(e.target.checked)}
                              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#00205B] focus:ring-[#00205B] flex-shrink-0"
                            />
                            <label htmlFor="agreement" className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              I agree to the <button type="button" onClick={() => setIsModalOpen(true)} className="text-[#00205B] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#00205B] focus:ring-offset-1 rounded-sm">AI Data Governance protocol</button> and understand that a human adjuster will perform the final review.
                            </label>
                          </div>
                          <button 
                            type="submit" 
                            disabled={submitStage !== 'idle' || !isAgreed}
                            className="relative inline-flex flex-shrink-0 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#00205B] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-opacity-90 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed min-w-[200px]"
                          >
                            {submitStage !== 'idle' && <Activity className="h-4 w-4 animate-spin" />}
                            {getButtonText()}
                          </button>
                        </div>
                        {errorMsg && (
                          <p className="text-red-500 text-sm font-medium w-full text-right">{errorMsg}</p>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {submitStage === 'executing' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 shadow-sm relative z-0">
                              <div className="bg-emerald-100 p-2 rounded-full shrink-0 mt-1 sm:mt-0">
                                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                              </div>
                              <div className="space-y-1.5">
                                <h4 className="text-sm font-bold text-emerald-900">Compliance & Privacy Assured</h4>
                                <p className="text-xs text-emerald-800 leading-relaxed">
                                  <strong className="font-semibold text-emerald-900">EU AI Act (Human-in-the-Loop):</strong> This AI triaging system is strictly advisory. All automated suggestions have been queued for mandatory review by a certified human adjuster before execution. <span className="font-semibold underline underline-offset-2">The participant will receive an email once the human-in-the-loop system review has been completed.</span>
                                </p>
                                <p className="text-xs text-emerald-800 leading-relaxed">
                                  <strong className="font-semibold text-emerald-900">GDPR (Data Minimization):</strong> No Personally Identifiable Information (PII) inclusive of name or email address was transmitted to or processed by the Large Language Model.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="results-view"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#00205B] mb-1">Claim Command Center</h2>
                      <p className="text-slate-500 text-sm">Session ID: <span className="font-mono text-xs">{sessionId}</span></p>
                    </div>
                    <button 
                      onClick={() => { setClaimResult(null); setSubmitStage('idle'); setDescription(''); setPolicyNumber('POL-'); setIncidentType(''); setSelectedImage(null); setName(''); setEmail(''); setIsAgreed(false); setErrorMsg(null); }}
                      className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      New Submission
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-[#00205B] px-6 py-4 border-b border-[#001845]">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                           <FileCheck className="h-5 w-5 text-blue-200" />
                           Digital Adjuster Report
                        </h3>
                    </div>
                    
                    <div className="p-6 sm:p-8 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Policy</p>
                             <p className="text-xl font-mono font-bold text-slate-900">{claimResult.policy_number || policyNumber}</p>
                          </div>
                          
                          <div className="space-y-2">
                             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Urgency Level</p>
                             <div>
                                {String(claimResult.urgency_level || claimResult.urgency_label) === '1' && (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                                      <div className="w-2 h-2 rounded-full bg-green-600"></div> Low
                                   </span>
                                )}
                                {String(claimResult.urgency_level || claimResult.urgency_label) === '2' && (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                                      <div className="w-2 h-2 rounded-full bg-yellow-600"></div> Medium
                                   </span>
                                )}
                                {String(claimResult.urgency_level || claimResult.urgency_label) === '3' && (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-200">
                                      <div className="w-2 h-2 rounded-full bg-red-600"></div> High
                                   </span>
                                )}
                                {!['1', '2', '3'].includes(String(claimResult.urgency_level || claimResult.urgency_label)) && (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                                      <div className="w-2 h-2 rounded-full bg-slate-600"></div> Unknown
                                   </span>
                                )}
                              </div>
                          </div>

                          <div className="space-y-2">
                             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Confidence</p>
                             <div className="flex items-end gap-2">
                               <p className="text-2xl font-bold text-[#00205B]">{claimResult.confidence_score || claimResult.confidence}%</p>
                             </div>
                          </div>
                       </div>
                       
                       <hr className="border-slate-100" />
                       
                       <div className="space-y-6">
                         {claimResult.escalation_required?.toLowerCase() === 'yes' && (
                           <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                             <h4 className="text-sm font-bold text-red-900 flex items-center gap-2 mb-2">
                               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                                 <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></div>
                               </span>
                               Escalation Required
                             </h4>
                             <p className="text-red-800 text-sm leading-relaxed">{claimResult.escalation_reasoning}</p>
                           </div>
                         )}
                         
                         {claimResult.status?.replace('_', ' ') === 'Manual Review Required' && (
                           <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                             <h4 className="text-sm font-bold text-orange-900 flex items-center gap-2 mb-2">
                               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
                                 <div className="h-2 w-2 rounded-full bg-orange-600 animate-pulse"></div>
                               </span>
                               Manual Review Required
                             </h4>
                             <p className="text-orange-800 text-sm leading-relaxed">{claimResult.next_step}</p>
                           </div>
                         )}

                         {(claimResult.urgency_reasoning || claimResult.assessment) && (
                           <div>
                              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-600" /> Assessment & Reasoning
                              </h4>
                              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                                 <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{claimResult.assessment || claimResult.urgency_reasoning}</p>
                              </div>
                           </div>
                         )}
                         
                         {claimResult.technical_summary && (
                           <div>
                              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <Cpu className="h-4 w-4 text-purple-600" /> Technical Summary
                              </h4>
                              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                                 <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{claimResult.technical_summary}</p>
                              </div>
                           </div>
                         )}

                         <details className="group border border-slate-200 rounded-lg bg-white overflow-hidden">
                            <summary className="text-sm font-semibold text-slate-700 cursor-pointer p-4 bg-slate-50 hover:bg-slate-100 flex items-center gap-2 transition-colors">
                              <Workflow className="h-4 w-4 text-slate-500" /> Debug: Raw Webhook Data
                            </summary>
                            <div className="bg-slate-900 border-t border-slate-200 p-4 overflow-x-auto">
                               <pre className="text-emerald-400 text-xs leading-relaxed font-mono whitespace-pre-wrap">
                                 {JSON.stringify(claimResult, null, 2)}
                               </pre>
                            </div>
                         </details>

                         <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2 mt-4">
                              <FileText className="h-4 w-4 text-[#00205B]" /> Submitted Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-100 rounded-lg p-5">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</p>
                                  <p className="text-sm font-medium text-slate-900 mt-1">{name}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</p>
                                  <p className="text-sm font-medium text-slate-900 mt-1">{email}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Incident Type</p>
                                  <p className="text-sm font-medium text-slate-900 mt-1">{incidentType}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Incident Description</p>
                                  <p className="text-sm text-slate-700 leading-relaxed mt-1">{description}</p>
                                </div>
                                {selectedImage && (
                                  <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Attachment</p>
                                    <div className="relative w-full max-w-sm h-48 rounded-md overflow-hidden border border-slate-200">
                                      {selectedImage.includes('drive.google.com') ? (
                                        <iframe src={selectedImage} width="100%" height="100%" allow="autoplay" className="border-0"></iframe>
                                      ) : (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={selectedImage} alt="Submitted attachment" className="object-cover w-full h-full" />
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                         </div>
                       </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Policy Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">AI Data Governance Protocol</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00205B]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                  <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Section 1: Data Minimization (GDPR)</h4>
                      <div className="space-y-2">
                        <p><strong className="text-slate-800">Anonymization:</strong> Personally Identifiable Information (PII) such as your name and policy number are stripped before the incident description is analyzed by the Large Language Model.</p>
                        <p><strong className="text-slate-800">Storage:</strong> All personal records remain within our secure encrypted environment. No data is used to train third-party AI models.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Section 2: Algorithmic Transparency (EU AI Act)</h4>
                      <div className="space-y-2">
                        <p><strong className="text-slate-800">Purpose:</strong> The AI Agent is used solely for Categorization and Severity Scoring to ensure the fastest possible response time.</p>
                        <p><strong className="text-slate-800">Explainability:</strong> Every AI decision generates an Audit Log that documents the reasoning used, which is accessible to our internal compliance team for quality assurance.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Section 3: Human-in-the-Loop</h4>
                      <div className="space-y-2">
                        <p><strong className="text-slate-800">Oversight:</strong> This system is not fully autonomous. All AI conclusions are flagged for mandatory review by a certified Insurance demo claims adjuster before any final action is taken in our core systems.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <button 
                    onClick={() => { setIsAgreed(true); setIsModalOpen(false); }}
                    className="px-6 py-2.5 bg-[#00205B] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00205B]"
                  >
                    Accept & Continue
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </>
  );
}
