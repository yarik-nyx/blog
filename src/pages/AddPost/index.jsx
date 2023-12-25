import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios'
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { selectIsAuth } from '../../redux/slices/auth';

export const AddPost = () => {
  const {id} = useParams()

  const navigate = useNavigate()

  const isAuth = useSelector(selectIsAuth)

  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageurl, setImageUrl] = React.useState('');

  const inputFileRef = React.useRef(null)

  const isEditing = Boolean(id)
  const handleChangeFile = async (event) => {
    try {
      const formData = await new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const {data} = await axios.post('uploads', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке файла')
    }
    
  };

  const onClickRemoveImage =  () => {
    setImageUrl('')
  };

  const onSubmit = async () => {
    try {
        setLoading(true)

        const fields = {
          title,
          imageurl,
          tags,
          text
        }
        console.log('fields',fields);
        const{data} = isEditing ? await axios.patch(`posts/${id}`, fields) : await axios.post('posts', fields)

        const postid = data.post.id

        navigate(`/posts/${postid}`)

    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи.')
    }
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  React.useEffect(() => {
    if(id){
      axios.get(`posts/${id}`).then(res => {
        setTitle(res.data.post.title)
        setText(res.data.post.text)
        setTags(res.data.post.tags)
        setImageUrl(res.data.post?.imageurl)
      })
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!isAuth){
    return <Navigate to='/'/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button className={styles.buttons_margin} onClick={() => inputFileRef.current.click()}variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageurl && (
        <>
          <Button className={styles.buttons_margin} variant="contained" color="error" onClick={onClickRemoveImage} size="large">
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageurl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        value={tags} 
        onChange={e => setTags(e.target.value)} 
        fullWidth 
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
