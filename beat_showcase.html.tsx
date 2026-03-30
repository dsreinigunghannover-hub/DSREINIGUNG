import React, { useState } from 'react';
import { Heart, Download, Play, Pause, Upload, X } from 'lucide-react';

export default function BeatShowcase() {
  const [beats, setBeats] = useState([
    {
      id: 1,
      title: "Dark Trap Beat",
      bpm: 140,
      key: "C minor",
      likes: 24,
      isLiked: false,
      isSaved: false,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Melodic Dream",
      bpm: 128,
      key: "A minor",
      likes: 18,
      isLiked: false,
      isSaved: false,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Hard808",
      bpm: 150,
      key: "G minor",
      likes: 31,
      isLiked: false,
      isSaved: false,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ]);

  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [filter, setFilter] = useState('all');

  const toggleLike = (id) => {
    setBeats(beats.map(beat => 
      beat.id === id 
        ? { ...beat, isLiked: !beat.isLiked, likes: beat.isLiked ? beat.likes - 1 : beat.likes + 1 }
        : beat
    ));
  };

  const toggleSave = (id) => {
    setBeats(beats.map(beat => 
      beat.id === id ? { ...beat, isSaved: !beat.isSaved } : beat
    ));
  };

  const togglePlay = (id) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
  };

  const filteredBeats = beats.filter(beat => {
    if (filter === 'liked') return beat.isLiked;
    if (filter === 'saved') return beat.isSaved;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo Placeholder */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-xl">
                MB
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  My Beats
                </h1>
                <p className="text-gray-400 text-sm">Premium Beat Collection</p>
              </div>
            </div>
            <button 
              onClick={() => setShowUpload(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <Upload size={18} />
              Upload Beat
            </button>
          </div>
        </div>
      </header>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg transition-all ${
              filter === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Alle Beats
          </button>
          <button
            onClick={() => setFilter('liked')}
            className={`px-6 py-2 rounded-lg transition-all ${
              filter === 'liked' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Gelikte
          </button>
          <button
            onClick={() => setFilter('saved')}
            className={`px-6 py-2 rounded-lg transition-all ${
              filter === 'saved' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Gespeichert
          </button>
        </div>
      </div>

      {/* Beats Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeats.map(beat => (
            <div 
              key={beat.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-600 transition-all group"
            >
              {/* Beat Cover */}
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => togglePlay(beat.id)}
                    className="w-16 h-16 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  >
                    {currentPlaying === beat.id ? (
                      <Pause size={28} fill="white" />
                    ) : (
                      <Play size={28} fill="white" className="ml-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* Beat Info */}
              <h3 className="text-xl font-bold mb-2">{beat.title}</h3>
              <div className="flex gap-4 text-sm text-gray-400 mb-4">
                <span>{beat.bpm} BPM</span>
                <span>•</span>
                <span>{beat.key}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleLike(beat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      beat.isLiked 
                        ? 'bg-pink-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Heart size={18} fill={beat.isLiked ? 'white' : 'none'} />
                    <span>{beat.likes}</span>
                  </button>
                  <button
                    onClick={() => toggleSave(beat.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      beat.isSaved 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    {beat.isSaved ? 'Gespeichert' : 'Speichern'}
                  </button>
                </div>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Beat hochladen</h2>
              <button 
                onClick={() => setShowUpload(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Beat Titel"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
              />
              <input
                type="number"
                placeholder="BPM"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Key (z.B. C minor)"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
              />
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-600 transition-all cursor-pointer">
                <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-400">MP3 oder WAV hochladen</p>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-lg font-bold transition-all">
                Beat veröffentlichen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}