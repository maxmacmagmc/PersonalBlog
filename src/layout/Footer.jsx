import { Github, Mails, Phone } from "lucide-react";

function Footer() {
    return (
        <footer className="flex flex-col sm:flex-row justify-between items-center p-8">
            <div className="flex flex-col sm:flex-row space-x-4 sm:space-x-6 justify-between items-center sm:items-center">
                <span className="flex text-center sm:text-center ">Get in touch</span>
                <span className="flex space-x-4 mt-4 sm:mt-0 ml-0 sm:ml-0 sm:space-around items-center">
                    <Github />
                    <Phone />
                    <Mails />
                </span>
            </div>
            <p className="underline mt-4 sm:mt-0">Home page</p>
        </footer>
    );
}

export { Footer };
