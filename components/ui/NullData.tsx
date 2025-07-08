interface NullDataProps {
    title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
    return (
        <div className="flex justify-center items-center my-5 w-full">
            <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text 
            bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-400 dark:to-orange-400 
            my-8 animate-pulse">
                {title}
            </p>
        </div>
    );
};

export default NullData;
