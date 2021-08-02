// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import markdownToHtml from "lib/markdownToHtml"
export default async function handler (req, res) {
  const accessToken = req.query.accesstoken || ''
  const response = await fetch(`https://cnodejs.org/api/v1/topic/${req.query.topicId}?mdrender=false&accesstoken=${accessToken}`)
  const data = await response.json()
  if(data.success) {
    const replies = await Promise.all(data.data.replies.map(async item => ({
      ...item,
      content: await markdownToHtml(item.content)
    })))
    res.statusCode = 200
    res.json(({...data.data, replies}))
  } else {
    res.statusCode = 500
  }
}
