'use client';
import { useState, useEffect } from 'react';
import { Play, Circle } from 'lucide-react';

const movies = [
    {
        id: 1,
        title: 'LOOPER',
        year: '2012',
        duration: '119 mins',
        genres: ['Action', 'Crime', 'Sci-fi'],
        synopsis: 'In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe.',
        rating: '7.5',
        image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
        gradient: 'from-amber-900 via-orange-800 to-red-900'
    },
    {
        id: 2,
        title: 'INCEPTION',
        year: '2010',
        duration: '148 mins',
        genres: ['Action', 'Thriller', 'Sci-fi'],
        synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        rating: '8.8',
        image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
        gradient: 'from-blue-900 via-indigo-800 to-purple-900'
    },
    {
        id: 3,
        title: 'BLADE RUNNER',
        year: '1982',
        duration: '117 mins',
        genres: ['Drama', 'Thriller', 'Sci-fi'],
        synopsis: 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        rating: '8.1',
        image: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800',
        gradient: 'from-cyan-900 via-teal-800 to-emerald-900'
    },
    {
        id: 4,
        title: 'THE MATRIX',
        year: '1999',
        duration: '136 mins',
        genres: ['Action', 'Thriller', 'Sci-fi'],
        synopsis: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth about his reality.',
        rating: '8.7',
        image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
        gradient: 'from-green-900 via-emerald-800 to-teal-900'
    },
    {
        id: 5,
        title: 'INTERSTELLAR',
        year: '2014',
        duration: '169 mins',
        genres: ['Adventure', 'Drama', 'Sci-fi'],
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        rating: '8.6',
        image: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800',
        gradient: 'from-slate-900 via-gray-800 to-zinc-900'
    }
];

export default function MovieCard() {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentMovie = movies[currentMovieIndex];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentMovieIndex((prevIndex) =>
                    prevIndex === movies.length - 1 ? 0 : prevIndex + 1
                );
                setIsTransitioning(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleDotClick = (index) => {
        if (index === currentMovieIndex) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentMovieIndex(index);
            setIsTransitioning(false);
        }, 300);
    };

    const handleCardHover = (hovering) => {
        setIsPaused(hovering);
        setIsHovered(hovering);
    };
    const shortSynopsis = currentMovie.synopsis.slice(0, 60) + '...';

    return (
        <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.02] "
            onMouseEnter={() => handleCardHover(true)}
            onMouseLeave={() => handleCardHover(false)}
        >
            <div className="flex flex-col md:flex-row md:gap-4">
                <div className="relative md:w-80 h-96 flex-shrink-0 overflow-hidden w-full">
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${currentMovie.gradient} transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                            }`}
                        style={{
                            backgroundImage: `url("${currentMovie.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                    <div className="absolute top-4 right-4 space-y-2">
                        {movies.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-2 h-2 rounded transition-all duration-300 hover:scale-125 cursor-pointer m-0.25 ${index === currentMovieIndex
                                        ? 'bg-white shadow-lg'
                                        : 'bg-white/40 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>

                    {isPaused && (
                        <div className="absolute bottom-4 left-4">
                            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-white text-xs font-medium">Paused</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className={`space-y-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                        }`}>
                        <div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
                                {currentMovie.title}
                            </h1>

                            <div className="flex items-center space-x-4 text-gray-600">
                                <span className="text-lg font-medium">{currentMovie.year}</span>
                                <span className="text-lg font-medium">{currentMovie.duration}</span>
                                <div className="flex items-center space-x-2">
                                    {currentMovie.genres.map((genre, index) => (
                                        <div key={genre} className="flex items-center space-x-2">
                                            <span className="text-teal-600 font-medium">{genre}</span>
                                            {index < currentMovie.genres.length - 1 && (
                                                <span className="text-gray-400">|</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 transition-all duration-500">

                            <div className="hidden md:block sm:max-w-sm max-w-0 ">
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {currentMovie.synopsis}
                                </p>
                            </div>

                            <div className="block md:hidden">
                                <p className="text-gray-700 text-base leading-snug">
                                    {shortSynopsis}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className={`flex items-center justify-between transition-all duration-500  ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        }`}>
                        <button className="group flex items-center space-x-3 px-6 py-3 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
                            <Play
                                className={`w-5 h-5 text-gray-700 transition-all duration-300 ${isHovered ? 'text-teal-600' : ''
                                    }`}
                                fill={isHovered ? 'currentColor' : 'none'}
                            />
                            <span className="text-gray-700 font-medium group-hover:text-teal-600 transition-colors ">
                                Watch Trailer
                            </span>
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border-3 border-orange-500 flex items-center justify-center bg-white shadow-lg">
                                    <span className="text-xl font-bold text-orange-500">{currentMovie.rating}</span>
                                </div>
                                <div className="absolute -inset-1 rounded-full border border-orange-200"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex space-x-1">
                            {movies.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1 rounded-full transition-all duration-300 ${index === currentMovieIndex
                                            ? 'bg-teal-500 flex-1'
                                            : 'bg-gray-200 w-8'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}