'use client';
import { Plate, PlateContent } from '@udecode/plate-common';
import plugins from './plate-ui/plugins';
import {Displayer} from './displayer';
import { Editor } from './plate-ui/editor';

export function ContentDisplayer({ content }: { content: any}) {
  const parsedContent = JSON.parse(content);
  return (
      <Plate plugins={plugins} initialValue={parsedContent}>
        {/* <Displayer /> */}
        {/* <PlateContent readOnly /> */}
        <Editor readOnly />
      </Plate>
  );
}