
const Loading = () => {
    return (
        <div className='container mx-auto'>
            <button type="button" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md h-2 disabled">
                <svg className="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24">...</svg>
                Loading...
            </button>
        </div>
    );
}

export default Loading;