'use client'
import { useState } from "react";
import { Upload, X, Film, Star, Clock, Calendar, Image as ImageIcon, ChevronDown } from "lucide-react";

export default function MovieAddForm() {
    const [formData, setFormData] = useState({
        title: "",
        synopsis: "",
        year: "",
        duration: "",
        rating: "",
        gradient: "",
        genres: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isRatingOpen, setIsRatingOpen] = useState(false);

    const genreOptions = [
        "Action", "Adventure", "Comedy", "Dram", "Horror", "Romance",
        "Sci-Fi", "Thriller", "Fantasy", "Documentary", "Animation", "Crime"
    ];

    const gradientOptions = [
        "from-purple-600 to-blue-600",
        "from-pink-500 to-rose-500",
        "from-emerald-500 to-teal-600",
        "from-orange-500 to-red-500",
        "from-indigo-500 to-purple-600",
        "from-cyan-500 to-blue-500"
    ];
//#region forSelect
    const ratingOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" }
    ];
//#endregion forSelect
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRatingSelect = (value) => {
        setFormData(prev => ({
            ...prev,
            rating: value
        }));
        setIsRatingOpen(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formDataToSend = new FormData();

            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            formDataToSend.set('year', parseInt(formData.year));
            formDataToSend.set('duration', parseInt(formData.duration));

            const res = await fetch("/api/movie", {
                method: "POST",
                body: formDataToSend
            });

            if (!res.ok) throw new Error("Error Ocurred");

            const data = await res.json();
            setMessage("Film added succesfully!");
            setMessageType("success");

            setFormData({
                title: "",
                synopsis: "",
                year: "",
                duration: "",
                rating: "",
                gradient: "",
                genres: "",
            });
            setSelectedImage(null);
            setImagePreview(null);

        } catch (err) {
            console.error(err);
            setMessage("Error Occurred, try agian");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    //#region ForSection
    const selectedRatingLabel = ratingOptions.find(option => option.value === formData.rating)?.label || "Choise Reyting";
    //#endregion

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                        <Film className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Movie</h1>
                    <p className="text-gray-600">Submit Form For Add New Film Your Collection</p>
                </div>

                <div className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="p-6 pb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Film Infomations</h2>
                        <p className="text-gray-600 mb-6">All datas are required</p>
                    </div>

                    <div className="px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Film Poster
                                </label>

                                {!imagePreview ? (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
                                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                            <p className="text-gray-600 font-medium">Poster Upload</p>
                                            <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-xl shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="title" className="text-base font-semibold text-gray-700">
                                    Movie Name *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter Movie Name"
                                    className="w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="synopsis" className="text-base font-semibold text-gray-700">
                                    Synopsis
                                </label>
                                <textarea
                                    id="synopsis"
                                    name="synopsis"
                                    value={formData.synopsis}
                                    onChange={handleChange}
                                    placeholder="Enter Short Film Synopsis..."
                                    className="w-full min-h-[120px] px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="year" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Year *
                                    </label>
                                    <input
                                        id="year"
                                        name="year"
                                        type="number"
                                        value={formData.year}
                                        onChange={handleChange}
                                        placeholder="2024"
                                        className="w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        min="1900"
                                        max="2030"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="duration" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Duration (min) *
                                    </label>
                                    <input
                                        id="duration"
                                        name="duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="120"
                                        className="w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="rating" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Reytinq (1–10)
                                </label>
                                <input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    placeholder="Məs: 4.5"
                                    className="w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-base font-semibold text-gray-700">Genres</label>
                                <input
                                    name="genres"
                                    value={formData.genres}
                                    onChange={handleChange}
                                    placeholder="Genres (exp: Action, Drama, Thriller)"
                                    className="w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {genreOptions.map((genre) => (
                                        <span
                                            key={genre}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-blue-100 transition-colors"
                                            onClick={() => {
                                                const currentGenres = formData.genres ? formData.genres.split(', ') : [];
                                                if (!currentGenres.includes(genre)) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        genres: prev.genres ? `${prev.genres}, ${genre}` : genre
                                                    }));
                                                }
                                            }}
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-base font-semibold text-gray-700">Gradient Color</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {gradientOptions.map((gradient) => (
                                        <div
                                            key={gradient}
                                            className={`h-12 rounded-lg bg-gradient-to-r ${gradient} cursor-pointer border-2 transition-all ${formData.gradient === gradient ? 'border-gray-800 scale-105' : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                            onClick={() => setFormData(prev => ({ ...prev, gradient }))}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Loading..." : "Add Film"}
                                </button>
                            </div>
                        </form>

                        {message && (
                            <div className={`mt-6 p-4 rounded-md border ${messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                                <p className={messageType === "success" ? "text-green-800" : "text-red-800"}>
                                    {message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}