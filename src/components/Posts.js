import React from 'react';
import {
  Chip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

export default class Posts extends React.Component {

  state = {
    posts: []
  }

  componentDidMount(){
    fetch('https://n161.tech/api/dummyapi/post?limit=10')
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts: posts.data });
      });
  }

  render(){
    return (
      <div className="Posts">
        <div className="PostStream">
          {this.state.posts.map(function(item, index){
            return (
              <Card key={item.id} style={{maxWidth: 600, margin: '30px'}}>
                  <CardHeader
                    avatar={
                      <Link to={`/user/${item.owner.id}`}><Avatar src={item.owner.image} alt={item.owner.firstName + ' ' + item.owner.lastName} style={{width: '40px', marginRight: 10, display: 'inline-block', verticalAlign: 'middle'}}/>{item.owner.firstName + ' ' + item.owner.lastName}</Link>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                <CardMedia
                  style={{height: 0, paddingTop: '56.25%'}}
                  image={item.image}
                  title={item.message}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.message}
                  </Typography>
                </CardContent>
                {item.tags.map(tag => {
                  if (tag) {
                    return (
                      <Link to={`/tag/${tag}`} key={tag}>
                        <Chip
                          variant="outlined"
                          clickable={true}
                          style={{margin: '5px'}}
                          label={tag}
                        />
                      </Link>
                    );
                  }
                })}
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            )
          })}
        </div>
        <Sidebar />
      </div>
    );
  }
}
