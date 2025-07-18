const FooterLinkGroup = ({ title, links }) => {
    return (
        <div>
            <h4 className="text-blue-900 font-semibold mb-4">{title}</h4>
            <ul className="space-y-2 text-blue-700">
                {links.map((link, index) => (
                    <li key={index}>
                        <a href="#" className="hover:text-blue-600 transition-colors">{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FooterLinkGroup;