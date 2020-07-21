import React, {useState, useEffect, useCallback} from 'react';
import {useLazyQuery} from '@apollo/client';
import * as Graphql from '../graphql';

const useInput = initialValue => {
  const [value, set] = useState(initialValue)
  
  return {value, onChange: (e) => set(e.target.value)}
}

const useRepoData = () => {
  const [getData, {loading, error, data}] = useLazyQuery(Graphql.SEARCH_REPO)
  const [query, setQuery] = useState('')

  const fetchData = useCallback(() => {
    getData({
      variables: {
        queryString: query
      }
    });
  }, [getData, query]);
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return [setQuery, {loading, error, data}]
}

const RepoInfo = () => {
  const stars = useInput(0)
  const language = useInput('')
  const [fetchData, {loading, error, data}] = useRepoData()
  
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
      <label>
        Language :
        <input type='text' {...language} />
      </label>
      
      <label>
        More than : 
        <input type='text' {...stars} />
        Stars 
      </label>
      
      <button className="button is-small is-primary is-outlined" onClick={handleOnClick}>
        search
      </button>
      
      
      {
        data ? data.search.nodes.map(
          repo => 
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

export default RepoInfo;
