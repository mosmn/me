'use client';
import { Plate, PlateContent } from '@udecode/plate-common';
import plugins from './plate-ui/plugins';
import {Displayer} from './displayer';
import { Editor } from './plate-ui/editor';

export function ContentDisplayer({ content, style }: { content: string, style?: any }) {
  const parsedContent = JSON.parse(content);
  return (
      <Plate plugins={plugins} initialValue={parsedContent} readOnly>
        {/* <Displayer /> */}
        {/* <PlateContent readOnly /> */}
        <Editor style={style} />
      </Plate>
  );
}