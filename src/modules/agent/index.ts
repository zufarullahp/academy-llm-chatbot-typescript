import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import initAgent from "./agent";
import { initGraph } from "../graph";
import { sleep } from "@/utils";

// tag::call[]
export async function call(input: string, sessionId: string): Promise<string> {
  // The agent requires an LLM.
  const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  // Note: only provide a baseURL when using the GraphAcademy Proxy
  configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  // The retrieval tool requires an embedding model.
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  // Get Graph Singleton Connection
  const graph = await initGraph();
  // TODO: Replace this code with an agent
  const agent = await initAgent(llm, embeddings, graph);
  const res = await agent.invoke({ input }, { configurable: { sessionId } });

  return res;
  
}
// end::call[]
