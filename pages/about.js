function About() {
    return (
        <div>
            <h1>About</h1>
            <p>
                This is the about page. "about" info goes here.
            </p>
        </div>
    );
};

export async function getStaticProps(context) {
    return {
        props:  {} // will be passed to the page component as props
    }
}

export default About;