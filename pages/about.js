import Layout from '../components/layout';

function About() {
    return (
        <Layout home>
            <h1>About</h1>
            <p>
                This is the about page. "about" info goes here.
            </p>
        </Layout>
    );
};

export async function getStaticProps(context) {
    return {
        props:  {} // will be passed to the page component as props
    }
}

export default About;