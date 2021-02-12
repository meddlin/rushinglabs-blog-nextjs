import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import linkPageStyles from '../styles/link-page.module.css';

function Links() {
    const links = [
        {
            site: "RushingLabs - YT",
            link: 'https://www.youtube.com/channel/UCMbD6urmMQBUUxjjvyXgaxw'
        }
    ]

    return (
        <div className={`${linkPageStyles.content}`}>
            <h1 className={`${utilStyles.headingXl}`}>RushingLabs - Links</h1>

            <ul className={`${utilStyles.list}`}>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/YouTube_SVG-icon.svg" width="30" height="30" />
                    <a href="https://www.youtube.com/channel/UCMbD6urmMQBUUxjjvyXgaxw">YouTube</a>
                </li>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/GitHub_SVG-icon.svg" width="30" height="30" />
                    <a href="https://github.com/meddlin">GitHub</a>
                </li>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/Instagram_SVG-icon.svg" width="30" height="30" />
                    <a href="https://www.instagram.com/rushinglabs/">Instagram</a>
                </li>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/Twitter_SVG-icon.svg" width="30" height="30" />
                    <a href="https://twitter.com/meddlin_dev">Twitter</a>
                </li>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/Facebook_SVG-icon.svg" width="30" height="30" />
                    <a href="https://www.facebook.com/Rushing-Labs-754569184895820">Facebook</a>
                </li>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/YouTube_SVG-icon.svg" width="30" height="30" />
                    <a href="https://www.youtube.com/channel/UC_y1S4qIDJ9G0CU2EzVeDtw">YouTube (Gaming)</a>
                </li>
                <li className={`${utilStyles.listItem}`}>
                    <Image src="/icons/GenericHardware-Fan_SVG-icon.svg" width="30" height="30" />
                    <a href="https://kit.co/meddlin">Kit - Hardware I Use</a>
                </li>
            </ul>
        </div>
    );
}

export default Links;