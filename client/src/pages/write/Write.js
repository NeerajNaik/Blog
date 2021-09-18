import axios from "axios";
import { useContext, useState,useEffect } from "react";
import { Context } from "../../context/Context";
import "./Write.css"
const Write = () => {
  const [title, setTitle] = useState("");
  // const [tags, settags] = useState([]);
  const [check,setcheck] = useState({c1:false,c2:false,c3:false,c4:false,c5:false,c6:false})
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  console.log(check)
  // console.log(tags)
  useEffect(() => {
    check.c1 ? document.getElementById("b1").style.background = "teal" : document.getElementById("b1").style.background = "tomato"
    check.c2 ? document.getElementById("b2").style.background = "teal" : document.getElementById("b2").style.background = "tomato"
    check.c3 ? document.getElementById("b3").style.background = "teal" : document.getElementById("b3").style.background = "tomato"
    check.c4 ? document.getElementById("b4").style.background = "teal" : document.getElementById("b4").style.background = "tomato"
    check.c5 ? document.getElementById("b5").style.background = "teal" : document.getElementById("b5").style.background = "tomato"
    check.c6 ? document.getElementById("b6").style.background = "teal" : document.getElementById("b6").style.background = "tomato"
  }, [check.c1,check.c2,check.c3,check.c4,check.c5,check.c6])
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    // useEffect(() => {

    // }, [check.c1])
    const li= []
    if(check.c1){
      // settags([...tags,document.getElementById("b1").value])
      li.push(document.getElementById("b1").value)
    }
    if(check.c2){
      li.push(document.getElementById("b2").value)
    }
    if(check.c3){
      li.push(document.getElementById("b3").value)
    }
    if(check.c4){
      li.push(document.getElementById("b4").value)
    }
    if(check.c5){
      li.push(document.getElementById("b5").value)
    }
    if(check.c6){
      li.push(document.getElementById("b6").value)
    }
    console.log(li)
    const newPost = {
      username: user.username,
      categories: li,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      console.log(newPost)
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err.response.data)
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="tagButtonGroup">
          <button value="Life" id="b1" className="tagButton"
            onClick={(e)=>{
            e.preventDefault()
            setcheck({...check,c1:!check.c1})
          }}>Life</button>
          <button value="Music" id="b2" className="tagButton"
            onClick={(e)=>{
            e.preventDefault()
            setcheck({...check,c2:!check.c2})
          }}>Music</button>
          <button value="Sport" id="b3" className="tagButton"
            onClick={(e)=>{
            e.preventDefault()
            setcheck({...check,c3:!check.c3})
          }}>Sport</button>
          <button value="Style" id="b4" className="tagButton"
            onClick={(e)=>{
            e.preventDefault()
            setcheck({...check,c4:!check.c4})
          }}>Style</button>
          <button value="Tech" id="b5" className="tagButton"
            onClick={(e)=>{
            e.preventDefault()
            setcheck({...check,c5:!check.c5})
          }}>Tech</button>                              
          <button value="Others" id="b6" className="tagButton"
            onClick={(e)=>{
            e.preventDefault()
            setcheck({...check,c6:!check.c6})
          }}>Others</button>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write
