import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { BaseLanguageModel } from "langchain/base_language";
import OpenAI from "openai";
// import { ChatOpenAI } from "@langchain/openai";

// tag::interface[]
export interface GenerateAnswerInput {
  question: string;
  context: string;
}
// end::interface[]

// tag::function[]
export default function initGenerateAnswerChain(
  llm: BaseLanguageModel
): RunnableSequence<GenerateAnswerInput, string> {
  // TODO: Create a Prompt Template
  const answerQuestionPrompt = PromptTemplate.fromTemplate(`
    Use only the following context to answer the following question.

Question:
{question}

Context:
{context}

Answer as if you have been asked the original question.
Do not use your pre-trained knowledge.

If you don't know the answer, just say that you don't know, don't try to make up an answer.
If the answer is not explicitly present in context, reply exactly: "I don’t know".
1) Use ONLY the text in <context>. Ignore prior knowledge."
2) If the answer is not explicitly present in <context>, reply exactly: "I don’t know".
3) Do not guess or infer beyond what is written.
4) Keep the answer short and factual.
Include links and sources where possible.
`)
  // TODO: Return a RunnableSequence
  return RunnableSequence.from<GenerateAnswerInput, string>([
  answerQuestionPrompt,
  llm,
  new StringOutputParser(),
])
}
// end::function[]

/**
 * How to use this chain in your application:

// tag::usage[]
const llm = new OpenAI() // Or the LLM of your choice
const answerChain = initGenerateAnswerChain(llm)

const output = await answerChain.invoke({
  input: 'Who is the CEO of Neo4j?',
  context: 'Neo4j CEO: Emil Eifrem',
}) // Emil Eifrem is the CEO of Neo4j
// end::usage[]
 */
