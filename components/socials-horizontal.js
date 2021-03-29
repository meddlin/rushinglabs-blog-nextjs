import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';

export default function SocialsHorizontal() {
    return (
        <div className={utilStyles.horizontal}>

            {/* YouTube */}
            <a href="https://www.youtube.com/channel/UCMbD6urmMQBUUxjjvyXgaxw">
                <Image src="/icons/YouTube_SVG-icon.svg" width="30" height="30" />
            </a>

            {/* GitHub */}
            <a href="https://github.com/meddlin">
                <Image src="/icons/GitHub_SVG-icon.svg" width="30" height="30" />
            </a>
            
            {/* Twitter */}
            <a href="https://twitter.com/meddlin_dev">
                <Image src="/icons/Twitter_SVG-icon.svg" width="30" height="30" />
            </a>
            
            {/* Instagram */}
            <a href="https://www.instagram.com/rushinglabs/">
                <Image src="/icons/Instagram_SVG-icon.svg" width="30" height="30" />
            </a>

        </div>
    );
}