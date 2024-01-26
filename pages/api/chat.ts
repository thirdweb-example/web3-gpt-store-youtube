import { Engine } from "@thirdweb-dev/engine";
import OpenAI from "openai";
import { CHAIN, CONTRACT_ADDRESS } from "../../lib/constants";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

const handler = async function POST(req: Request) {
    const { messages, address, tokenId } = await req.json();

    try {
        const engine = new Engine({
            url: process.env.ENGINE_URL as string,
            accessToken: process.env.ENGINE_ACCESS_TOKEN as string
        });

        const isOwner = await engine.erc1155.balanceOf(
            address,
            tokenId,
            CHAIN,
            CONTRACT_ADDRESS
        );

        if (isOwner.result === "0") {
            return new Response("You do not own this token", {
                status: 403
            });
        }

        const nftMetadata = await engine.erc1155.get(
            tokenId,
            CHAIN,
            CONTRACT_ADDRESS
        );
        const contextContent = nftMetadata.result.metadata.description;

        const context = {
            role: 'system',
            content: contextContent
        };

        const combinedMessages = [context, ...messages];

        const reponse = await openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            stream: true,
            messages: combinedMessages,
        });

        const stream = OpenAIStream(reponse);

        return new StreamingTextResponse(stream);
    } catch (error) {
        console.log(error);
    }
};

export default handler;