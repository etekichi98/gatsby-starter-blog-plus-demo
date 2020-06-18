import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image"
import "./postlisting.css";

class PostListing extends React.Component {
  Media(props){
    if(props.post.avatar){
      return(
        <div class="media">
          <span class="media__image">
            <Link style={{ boxShadow: `none` }} to={props.post.path}>
              <Image fixed={props.post.avatar.childImageSharp.fixed} alt={props.post.title}/>
            </Link>
          </span>
          <span class="media__summary">
            <p class="media__title">
              <Link style={{ boxShadow: `none` }} to={props.post.path}>
                {props.post.title}
              </Link>
            </p>
            <p class="media__date">{props.post.date}</p>
          </span>
        </div>
      );
    }
    else{
      return(
        <div class="media">
          <span class="media__summary_100">
            <p class="media__title">
              <Link style={{ boxShadow: `none` }} to={props.post.path}>
                {props.post.title}
              </Link>
            </p>
            <p class="media__date">{props.post.date}</p>
          </span>
        </div>
      );
    }
  }

  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        excerpt: postEdge.node.excerpt,
        path: postEdge.node.fields.slug,
        title: postEdge.node.frontmatter.title,
        avatar: postEdge.node.frontmatter.avatar,
        description: postEdge.node.frontmatter.description,
        date: postEdge.node.frontmatter.date,
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <article key={post.path}>
              <this.Media post={post}/>

              <div>
                <p
                   dangerouslySetInnerHTML={{
                    __html: post.description || post.excerpt,
                  }}
                 />
              </div>
          </article>
        ))}
      </div>
    );
  }
}

export default PostListing;
