import { bootstrapp } from "@/cli/bootstrapp";
import { getCliCommand } from "@/utils/getCliCommand";
import { runCommand } from "@/utils/runCommand";

function runCli() {
  runCommand(getCliCommand());
}

bootstrapp(runCli);
