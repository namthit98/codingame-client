import agent from '../libs/agent'

export const listQuestions = async query => {
  const result = await agent.get('/questions', {
    params: query,
  })

  return result.data
}
