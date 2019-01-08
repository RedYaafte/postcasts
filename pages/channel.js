import 'isomorphic-fetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastLis from '../components/PodcastList';

export default class extends React.Component {

  static async getInitialProps({ query }) {
    let idChannel = query.id;

    let [ reqChannel, reqAudio, reqSeries ] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;

    let dataAudios = await reqAudio.json();
    let audioClips = dataAudios.body.audio_clips;

    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels;

    return { channel, audioClips, series }
  }

  render() {
    const { channel, audioClips, series } = this.props;

    return (
      <div>
        <Layout title={ channel.title }>
          <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
          <h1>{channel.title}</h1>

          { series.length > 0 &&
            <div>
              <h2>Series</h2>
              <ChannelGrid channels={ series } />
            </div>
          }

          <h2>Ultimos Podcasts</h2>
          <PodcastLis audioClips={ audioClips } />

          <style jsx={value.toString(true)}>{`
            .banner {
              width: 100%;
              padding-bottom: 25%;
              background-position: 50% 50%;
              background-size: cover;
              background-color: #aaa;
            }

            h1 {
              font-weight: 600;
              padding: 15px;
            }
          `}</style>
        </Layout>
      </div>
    )
  }
}