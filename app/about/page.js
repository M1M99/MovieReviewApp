function AboutPage() {
    return (
        <div>
            <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl my-10">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-48"
                            src="https://www.vintagemovieposters.co.uk/wp-content/uploads/2020/01/IMG_2891-636x935.jpeg"
                            alt="Modern building architecture"
                        />
                    </div>
                    <div className="p-8">
                        <div className="text-2xl font-semibold tracking-wide text-indigo-500 uppercase">About Us</div>
                        <a href="#" className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
                            Incredible environment for simple people
                        </a>
                        <p className="mt-5 text-gray-500">
                            Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
                            places to do just that.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl my-10">
                <div className="md:flex">
                    <div className="md:shrink-0 ">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-48 "
                            src="https://filmartgallery.com/cdn/shop/products/John-Wick-Vintage-Movie-Poster-Original.jpg?v=1738908733"
                            alt="Modern building architecture"
                        />
                    </div>
                    <div className="p-8 shadow-amber-50 shadow-xl">
                        <div className="text-lg font-semibold tracking-wide text-indigo-600 uppercase ">About Website</div>
                        <a href="#" className=" mt-1 block text-lg leading-tight font-medium text-black hover:underline">
                            Amazing movies for honest viewers.
                        </a>
                        <p className="mt-5 text-gray-500">
                            With a clean interface, real user reviews, and curated recommendations, we make it easy to fall in love with cinema all over again.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
