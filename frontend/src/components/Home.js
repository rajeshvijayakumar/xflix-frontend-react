import React from 'react';
import VideoContainer from './VideoContainer';
import { Container, Col, Row, Card } from 'react-bootstrap';
import './Home.css';
import { config } from '../App';
import Header from './Header';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.videos = [];
    this.state = {
      filteredVideos: [],
      loading: false,
    };
  }

  VideoApiCall = async () => {
    let response = {};
    let errored = false;

    this.setState({
      loading: true,
    });

    try {
      response = await (await fetch(`${config.endpoint}/videos`)).json();
      return response;
    } catch (e) {
      errored = true;
    }
  };

  getVideoData = async () => {
    let data = await this.VideoApiCall();
    if (data) {
      this.videos = data.videos;
      this.setState({
        filteredVideos: [...this.videos],
      });
    } else {
      console.log('data not fetched y');
    }
  };
  search = value => {
    console.log(value);
    let upperText = value.toUpperCase();
    let temp = this.videos.filter(
      x =>
        x.title.toUpperCase().includes(upperText) ||
        x.genre.toUpperCase().includes(upperText)
    );
    this.setState({
      filteredVideos: [...temp],
    });
  };
  componentDidMount() {
    this.getVideoData();
  }

  getVideoTiles = video => {
    return (
      <Col lg={3}>
        <VideoContainer video={video} />
      </Col>
    );
  };
  Filter = filters => {
    let temps = [];
    console.log(filters);

    if (
      !(
        filters.length == 1 &&
        (filters[0] == 'ReleaseDate' || filters[0] == 'ViewCount')
      )
    ) {
      if (filters.includes('All Genre')) {
        if (
          filters.includes('7+') ||
          filters.includes('12+') ||
          filters.includes('16+') ||
          filters.includes('18+')
        ) {
          for (let i of filters) {
            let temp = this.videos.filter(x => x.contentRating == i);
            temps.push(...temp);
          }
        } else {
          temps = [...this.videos];
        }
      }
      if (filters.includes('Any Age')) {
        if (
          filters.includes('Education') ||
          filters.includes('Sports') ||
          filters.includes('Lifestyle') ||
          filters.includes('Comedy')
        ) {
          for (let i of filters) {
            let temp = this.videos.filter(x => x.genre == i);
            temps.push(...temp);
          }
        } else {
          temps = [...this.videos];
        }
      } else {
        for (let i of filters) {
          let temp = this.videos.filter(
            x => x.genre == i || x.contentRating == i
          );
          temps.push(...temp);
        }
      }

      if (filters.includes('ReleaseDate')) {
        temps.sort((a, b) => {
          return new Date(a.releaseDate) - new Date(b.releaseDate);
        });
      } else if (filters.includes('ViewCount')) {
        temps.sort((a, b) => {
          return parseInt(b) - parseInt(a);
        });
      }

      this.setState({
        filteredVideos: [...temps],
      });
    } else if (
      filters.length == 1 &&
      (filters[0] == 'ReleaseDate' || filters[0] == 'ViewCount')
    ) {
      if (filters.includes('ReleaseDate')) {
        this.videos.sort((a, b) => {
          return new Date(a.releaseDate) - new Date(b.releaseDate);
        });
      } else if (filters.includes('ViewCount')) {
        this.videos.sort((a, b) => {
          return parseInt(b) - parseInt(a);
        });
      }
      this.setState({
        filteredVideos: [...this.videos],
      });
    }
  };

  render() {
    return (
      <>
        <Header
          searchValue={value => this.search(value)}
          Filters={filters => this.Filter(filters)}
        />
        <Container className="vid-cont">
          <Row>
            {this.state.filteredVideos.length
              ? this.state.filteredVideos.map(video =>
                  this.getVideoTiles(video)
                )
              : false}
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(App);
