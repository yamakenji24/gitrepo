import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import styled from 'styled-components';
import * as Graphql from '../graphql';

const useInput = initialValue => {
    const [value, set] = useState(initialValue)

    return {value, onChange: (e) => set(e.target.value)}
}

const useFetchData = () => {
    const [getData, {loading, error, data}] = useLazyQuery(Graphql.SEARCHREPO)
    const [query, setQuery] = useState('')

    useEffect(() => {
        getData({
            variables: {
                queryString: query
            }
        })
    }, [getData, query])

    return [setQuery, {loading, error, data}]
}

const RepoInfo = () => {
    const stars = useInput(0)
    const language = useInput('')
    const [fetchData, {loading, error, data}] = useFetchData()
    
    const handleOnClick = () => {
        fetchData(`language:${language.value} stars:>${stars.value}`)
    }
    
    if (loading) return <p>Loading Repository</p>
    if (error) return <p>Error while searching Repository</p>

    return (
        <>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className='navbar-item'>
                        GitRepo
                    </a>
                </div>
            </nav>
            <SearchContainer>
                <label>
                    Language:  
                    <input type='text' {...language} />
                </label>
                <label>
                    ★以上 
                    <input type='text' {...stars} />
                </label>

                <button className="button is-small is-primary is-outlined" onClick={handleOnClick}>
                    search
                </button>
            </SearchContainer>
           
            { data ? 
            data.search.nodes.map(repo => 
                <div key={repo.databaseId}>
                    <h2>{repo.nameWithOwner}</h2>
                    <img src={repo.openGraphImageUrl} alt='repoImage' />

                </div>
            )
            : <></>
            }
        </>
    )
}

const SearchContainer = styled.div`
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 10px;
`;

export default RepoInfo;