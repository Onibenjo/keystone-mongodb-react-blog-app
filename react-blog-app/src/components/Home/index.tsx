import { gql, useQuery } from '@apollo/client'
import '../../App.css';

const EXCHANGE_RATES = gql`
    query {
        allPosts {
            id
            body
            title
        }
    }
`

interface PostType {
    id: string;
    body: string;
    title: string;
}

const Home = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: </p>

    console.log(data)
    return (
        <div className="App">
            <header className="App-header">
                    {data.allPosts.map(({ title, id, body }: PostType) => (
                        <div key={id} className="card">
                            <h4>{title}</h4>
                            <p>{body}</p>
                        </div>
                    ))}
            </header>
        </div>
    )
}

export default Home