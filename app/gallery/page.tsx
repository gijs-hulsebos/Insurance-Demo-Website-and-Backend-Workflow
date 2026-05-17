'use client';

import { motion } from 'motion/react';
import { Camera, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

const driveFiles = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_IDS?.split(',') || [];

const dataset = [
  {
    id: driveFiles[0] || '',
    name: 'Vehicle collision Front .jpg',
    title: 'Frontal Collision',
    description: 'Extensive front-end damage to the hood and grille following a collision.'
  },
  {
    id: driveFiles[1] || '',
    name: 'Vehicle Collision Pole.jpg',
    title: 'Utility Pole Collision',
    description: 'Rear bumper and taillight damage after backing into a utility pole.'
  },
  {
    id: driveFiles[2] || '',
    name: 'Vehicle collision tree.jpg',
    title: 'Tree Collision',
    description: 'Severe front-end crush damage after hydroplaning into a tree.'
  },
  {
    id: driveFiles[3] || '',
    name: 'Vehicle flat tire by nail.jpg',
    title: 'Flat Tire (Nail)',
    description: 'Severe puncture to the tire caused by running over construction debris.'
  },
  {
    id: driveFiles[4] || '',
    name: 'Windshield broke stone.jpeg',
    title: 'Shattered Windshield',
    description: 'Windshield shattered completely due to a falling rock while driving.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.4 } }
};

export default function GalleryPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="pt-24 pb-12 w-full flex flex-col items-center bg-white border-b border-slate-200">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
            <Camera className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#00205B] mb-6">
            Incident Gallery
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Browse our dataset of sample claims. These images are securely hosted on Google Drive and are used to demonstrate our AI categorisation capabilities.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {dataset.map((file) => (
            <motion.div 
              key={file.id} 
              variants={itemVariants}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                <iframe 
                  src={`https://drive.google.com/file/d/${file.id}/preview`} 
                  title={file.name}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                  className="border-0 w-full h-full pointer-events-auto"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">
                    {file.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                  {file.description}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <a 
                    href={`https://drive.google.com/file/d/${file.id}/view?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors shrink-0"
                  >
                    View Original &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
