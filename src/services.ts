import axios from "axios";

export const chatMsg = (content: string, userId: number) => {
    axios.post('http://localhost:7777/chat', {
      user: {
        id: userId,
        nick: '匿名用户',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01JGYv9V1s1rBNshgTz_!!6000000005707-0-tps-1170-874.jpg'
      },
      content
    })
}

export const syncMsg = () => {
    return axios.get(`http://localhost:7777/chatHistory?query=${encodeURIComponent('{list{content user{nick icon}}}')}`).then(res => res.data.data.list)
}