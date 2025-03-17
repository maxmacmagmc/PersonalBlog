function BlogCard({ image, category, title, description, authorImage, author, date }) {
    return (
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-xl mx-auto">
        <a href="#" className="relative h-48 sm:h-64 md:h-80 lg:h-96">
          <img className="w-full h-full object-cover rounded-md" src={image} alt={title} />
        </a>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
              {category}
            </span>
          </div>
          <a href="#">
            <h2 className="text-start font-bold text-lg sm:text-xl md:text-2xl mb-2 line-clamp-2 hover:underline">
              {title}
            </h2>
          </a>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-grow line-clamp-3">
            {description}
          </p>
          <div className="flex items-center text-sm">
            <img className="w-8 h-8 rounded-full mr-2" src={authorImage} alt={author} />
            <span>{author}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export { BlogCard };
  