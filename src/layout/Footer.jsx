import { Github, Mails, Phone } from "lucide-react";

function Footer() {
    return (
        <footer className="flex flex-col sm:flex-row justify-between items-center p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center">
    <span className="text-center">Get in touch</span>
    <span className="flex space-x-4 mt-4 sm:mt-0 items-center justify-center p-4">
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
