'use client';

import { useEffect, useState } from 'react';
import { Play, Star, Calendar, Clock, Tag, Info, Plus, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


//#region MockData
// const movies = [
//   {
//     id: 1,
//     title: 'LOOPER',
//     year: '2012',
//     duration: '119 mins',
//     genres: ['Action', 'Crime', 'Sci-fi'],
//     synopsis: 'In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe.',
//     rating: '7.5',
//     image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
//     gradient: 'from-amber-900 via-orange-800 to-red-900',
//     director: 'Rian Johnson',
//     cast: ['Joseph Gordon-Levitt', 'Bruce Willis', 'Emily Blunt']
//   },
//   {
//     id: 2,
//     title: 'INCEPTION',
//     year: '2010',
//     duration: '148 mins',
//     genres: ['Action', 'Thriller', 'Sci-fi'],
//     synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
//     rating: '8.8',
//     image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
//     gradient: 'from-blue-900 via-indigo-800 to-purple-900',
//     director: 'Christopher Nolan',
//     cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy']
//   },
//   {
//     id: 3,
//     title: 'BLADE RUNNER',
//     year: '1982',
//     duration: '117 mins',
//     genres: ['Drama', 'Thriller', 'Sci-fi'],
//     synopsis: 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
//     rating: '8.1',
//     image: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800',
//     gradient: 'from-cyan-900 via-teal-800 to-emerald-900',
//     director: 'Ridley Scott',
//     cast: ['Harrison Ford', 'Rutger Hauer', 'Sean Young']
//   },
//   {
//     id: 4,
//     title: 'THE MATRIX',
//     year: '1999',
//     duration: '136 mins',
//     genres: ['Action', 'Thriller', 'Sci-fi'],
//     synopsis: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth about his reality.',
//     rating: '8.7',
//     image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
//     gradient: 'from-green-900 via-emerald-800 to-teal-900',
//     director: 'The Wachowskis',
//     cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']
//   },
//   {
//     id: 5,
//     title: 'INTERSTELLAR',
//     year: '2014',
//     duration: '169 mins',
//     genres: ['Adventure', 'Drama', 'Sci-fi'],
//     synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
//     rating: '8.6',
//     image: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800',
//     gradient: 'from-slate-900 via-gray-800 to-zinc-900',
//     director: 'Christopher Nolan',
//     cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']
//   },
//   {
//     id: 6,
//     title: 'EX MACHINA',
//     year: '2014',
//     duration: '108 mins',
//     genres: ['Drama', 'Thriller', 'Sci-fi'],
//     synopsis: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence.',
//     rating: '7.7',
//     image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
//     gradient: 'from-purple-900 via-pink-800 to-rose-900',
//     director: 'Alex Garland',
//     cast: ['Domhnall Gleeson', 'Alicia Vikander', 'Oscar Isaac']
//   }
// ];

//#endregion MockData

export default function MovieGrid() {
  const [movie22, setMovies] = useState([]);
  async function GET(params) {
    const movies = await fetch('/api/movie').then(res => res.json())
      .then(data => setMovies(data))
  }
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedMovies, setLikedMovies] = useState(new Set());
  const router = useRouter();
  useEffect(() => {
    GET();
  }, [])

  const toggleLike = (movieId) => {
    setLikedMovies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className=" inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.1),transparent_50%)] opacity-40"></div>
      <div className=" inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(236,72,153,0.1),transparent_50%)] opacity-30"></div>

      <div className="relative z-10 pt-13 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Premium
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cinema
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover extraordinary stories through stunning visuals and immersive experiences
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {movie22.map((movie, index) => (
            <div
              key={movie.id}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 hover:border-white/20"
              onMouseEnter={() => setHoveredCard(movie.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <div className="relative h-96 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${movie.gradient} transition-all duration-700 group-hover:scale-110`}
                  style={{
                    backgroundImage: `url("${movie.imageUrl}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-bold text-sm">{movie.rating}</span>
                  </div>

                  <button
                    onClick={() => toggleLike(movie.id)}
                    className="bg-black/70 backdrop-blur-sm rounded-full p-2 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${likedMovies.has(movie.id)
                        ? 'text-red-400 fill-current'
                        : 'text-white/80 hover:text-red-400'
                        }`}
                    />
                  </button>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredCard === movie.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20">
                    <Play className="w-10 h-10 text-white fill-current ml-1 cursor-pointer" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                    {movie.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-white/80 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{movie.duration}m</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full text-xs font-medium text-white/90 border border-white/10 hover:border-white/20 transition-colors duration-300"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{genre}</span>
                    </span>
                  ))}
                </div> */}

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {movie.synopsis}
                </p>
                {movie.reviews && movie.reviews.length > 0 && (
                  <div className="mt-4 text-sm text-white/80 space-y-2">
                    <h4 className="font-semibold text-white">Reviews:</h4>

                    {(() => {
                      const reviewsWithComment = movie.reviews.filter(r => r.comment?.trim());
                      const reviewsToShow = reviewsWithComment.length > 0
                        ? reviewsWithComment.slice(0, 2)
                        : movie.reviews.slice(0, 2);
                      return reviewsToShow.map((review, i) => (
                        <div key={i} className="border-l-4 border-white/20 pl-3 italic text-gray-300">
                          {review.comment || <span className="text-gray-500">No comment</span>} –
                          <span className="ml-2 text-yellow-300 font-medium">{review.rating}</span>
                        </div>
                      ));
                    })()}
                  </div>
                )}

                <div className="space-y-2 text-xs text-gray-400">
                  <div>
                    <span className="font-medium text-gray-300">Director: </span>
                    <span className="text-white/80">{movie.director}</span>
                  </div>
                  
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                    <Play className="w-4 h-4 inline mr-2" />
                    Watch Now
                  </button>
                  <button onClick={() => router.push(`/movies/${movie.id}`)} className="px-4 cursor-pointer py-3 border border-white/20 text-white/80 rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-white/30">
                    <Info className="w-4 h-4 " />
                  </button>
                  <button className="px-4 py-3 border border-white/20 text-white/80 rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-white/30">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={`absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none ${hoveredCard === movie.id
                ? 'bg-gradient-to-br from-white/10 via-transparent to-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
                : ''
                }`} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}