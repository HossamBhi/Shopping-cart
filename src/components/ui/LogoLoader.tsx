import { Logo } from "../../assets/svg";

const LogoLoader = () => (
  <div data-testid="logoLoader" className="flex w-full items-center justify-center">
    <Logo className="w-[20%] animate-bounce pt-[20%]" />
  </div>
);

export default LogoLoader