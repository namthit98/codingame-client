import agent from '../libs/agent'

export const runCode = async data => {
  const result = await agent.post('/code/excute', data)

  return result.data
}
