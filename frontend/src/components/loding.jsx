export const postLoding = () =>{}

export const LoadingAnimation = () => {
    return (
        <div className="loading-container inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-white rounded-full animate-spin">
        </div>
        );
}

export const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
        <div className="h-20 w-20 border-2 border-t-red-900 rounded-full animate-spin border-t-4"></div>
    </div>
    );
}