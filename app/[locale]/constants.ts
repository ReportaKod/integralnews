
export default function Constants() {

    const BASE_PATH = process.env.NEXT_PUBLIC_MODE === "production" ? process.env.ROOT_PATH : process.env.ROOT_DEV; 

    return {
        BASE_PATH
    }
}