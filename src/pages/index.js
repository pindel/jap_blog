import React from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";
import Layout from "../components/layout";
import {Helmet} from "react-helmet";

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <div className="application">
        <Helmet>
          {" "}
          <meta charSet="utf-8" /> <title>John Pindel</title>
          <link rel="canonical" href="http://johnpindel.com" />
        </Helmet>
        <h1
          css={css`
            display: inline-block;
          `}
        >
          東京住んでる
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 380)
        }
      }
    }
  }
`;
