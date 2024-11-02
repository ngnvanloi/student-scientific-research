import { DropboxLogo } from "@/assets/svg/dropbox.logo";
import { NotionLogo } from "@/assets/svg/notion.logo";
import { GithubLogo } from "@/assets/svg/github.logo";
import { MicrosoftLogo } from "@/assets/svg/microsoft.logo";
import { LinearLogo } from "@/assets/svg/Linear.logo";
import { CanvaLogo } from "@/assets/svg/canva.logo";
import { ZoomLogo } from "@/assets/svg/zoom.logo";
import { SlackLogo } from "@/assets/svg/slack.logo";
const CooperationUnit = () => {
  return (
    <div className="mt-12 flex justify-center">
      <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-6 md:gap-x-16">
        {/* LOGO 1 */}
        <DropboxLogo />
        {/* LOGO 2 */}
        <NotionLogo />
        {/* LOGO 3 */}
        <GithubLogo />
        {/* LOGO 4 */}
        <MicrosoftLogo />
        {/* LOGO 5 */}
        <LinearLogo />
        {/* LOGO 6 */}
        <CanvaLogo />
        {/* LOGO 7 */}
        <ZoomLogo />
        {/* LOGO 8 */}
        <SlackLogo />
      </ul>
    </div>
  );
};
export { CooperationUnit };
