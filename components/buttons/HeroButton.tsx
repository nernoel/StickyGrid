import { useRouter } from "next/navigation"; 

export default function HeroButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/dashboard");
    }

    return (
        <button onClick={handleClick} className="self-start px-4 py-2 bg-blue-600 font-bold hover:bg-blue-800 text-white rounded-full">Get Started!</button>
    )
}
