import React,{useState,useEffect} from 'react'
import Header from '../../components/header/Header'
import "./Home.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Posts from "../../components/posts/Posts"
import axios from "axios";
import { useLocation } from "react-router";
const Home = () => {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    console.log("joi",search)
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
      };
      fetchPosts();
    }, [search]);
    return (
      <>
        <Header />
        <div className="home">
          <Posts posts={posts} />
          <Sidebar />
        </div>
      </>
    );
}

export default Home
