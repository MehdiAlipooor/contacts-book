import { Command } from 'commander';
import { Schema } from '../types';
import inquirer from 'inquirer';
import { program } from '../cli/program';

type CreateCliModule = ({
  command,
}: {
  command: string;
  description: string;
  schema?: Schema[];
  action: (...args: any) => void;
}) => Command;

const getSchema = async (schema?: Schema[]) => {
  if (!schema) {
    return;
  }
  return await inquirer.prompt(schema);
};

export const createCliModule: CreateCliModule = ({ command, description, action, schema }) => {
  return program
    .command(command)
    .description(description)
    .action(async () => {
      action(await getSchema(schema));
    });
};
