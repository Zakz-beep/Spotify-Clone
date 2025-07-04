import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: Promise<{
        title?: string; // Make it optional since it might not exist
    }>;
}

const Search = async ({ searchParams }: SearchProps) => {
    // Await the searchParams since it's now a Promise in Next.js 15
    const params = await searchParams;
    
    // Use optional chaining or default value
    const songs = await getSongsByTitle(params.title || '');
    
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className='text-white text-3xl font-semibold'>
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    );
};

export default Search;