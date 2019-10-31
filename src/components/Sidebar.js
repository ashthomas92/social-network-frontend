import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {

  state = {
    tags: []
  }

  componentDidMount(){
    fetch('https://n161.tech//api/dummyapi/tag?limit=50')
      .then(response => response.json())
      .then(tags => {
        this.setState({ tags: tags.data });
      });
  }

  render(){
    return (
      <div className="Tags">
        <h2>Tags</h2>
        {this.state.tags.map(tag => {
          return (
            <Link to={`/tag/${tag}`} key={tag}>
              <Chip
                clickable={true}
                style={{margin: '5px 5px 0 0'}}
                key={tag}
                label={tag}
              />
            </Link>
          );
        })}
      </div>
    );
  }
}
