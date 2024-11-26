'use client';
/* eslint-disable */
import {
  useCreateUserTaskTags,
  useDeleteTag,
  useUpdateTag,
} from '@/app/api/hooks/mutations';
import {
  GET_USER_TASK_TAGS_QUERY_KEY,
  useGetUserTaskTags,
} from '@/app/api/hooks/queries';
import { ColorPicker } from '@/components/ColorPicker';
import { CstmTooltip } from '@/components/CstmTooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Info, Trash } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_TAG_VALUES = {
  value: 'tag',
  color: '#ccc',
};

export default function SettingsClient() {
  const [targetTagId, setTargetTagId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: userTags, isLoading } = useGetUserTaskTags();
  const { mutate: mutateCreateTag, isPending: isPendingCreatingTag } =
    useCreateUserTaskTags({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_USER_TASK_TAGS_QUERY_KEY],
        });
      },
    });

  const { mutate: mutateDeleteTag, isPending: isPendingDeletingTag } =
    useDeleteTag({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_USER_TASK_TAGS_QUERY_KEY],
        });
        setTargetTagId(null);
      },
      onSettled: () => {
        setTargetTagId(null);
      },
    });

  const { mutate: mutateUpdateTag, isPending: isPendingUpdateTag } =
    useUpdateTag({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_USER_TASK_TAGS_QUERY_KEY],
        });
      },
    });

  if (isLoading || !userTags?.length) {
    return null;
  }

  // const toggleEditMode = () => {
  //   setEditMode((prev) => !prev);
  // };

  const handleTagChange = (id: string, newValue: string) => {
    queryClient.setQueryData(
      [GET_USER_TASK_TAGS_QUERY_KEY],
      (oldData: typeof userTags | undefined) => {
        if (!oldData) return [];
        return oldData.map((tag) =>
          tag.id === id ? { ...tag, value: newValue } : tag
        );
      }
    );
  };

  const handleTagColorChange = (id: string, newColor: string) => {
    queryClient.setQueryData(
      [GET_USER_TASK_TAGS_QUERY_KEY],
      (oldData: typeof userTags | undefined) => {
        if (!oldData) return [];
        return oldData.map((tag) =>
          tag.id === id ? { ...tag, color: newColor } : tag
        );
      }
    );
  };

  const handleAddTag = () => {
    queryClient.setQueryData(
      [GET_USER_TASK_TAGS_QUERY_KEY],
      (oldData: typeof userTags) => {
        if (!oldData) return [DEFAULT_TAG_VALUES];
        return [...oldData, DEFAULT_TAG_VALUES];
      }
    );

    mutateCreateTag(
      { value: DEFAULT_TAG_VALUES.value, color: DEFAULT_TAG_VALUES.color },
      {
        onSuccess: () => {
          // queryClient.setQueryData(
          //   [GET_USER_TASK_TAGS_QUERY_KEY],
          //   (oldData: typeof userTags) => {
          //     if (!oldData) return [createdTag];
          //     return oldData.map((tag) =>
          //       tag.id === DEFAULT_TAG_VALUES.id ? createdTag : tag
          //     );
          //   }
          // );
        },
        onError: () => {
          // queryClient.setQueryData(
          //   [GET_USER_TASK_TAGS_QUERY_KEY],
          //   (oldData: typeof userTags | undefined) => {
          //     if (!oldData) return [];
          //     return oldData.filter((tag) => tag.id !== DEFAULT_TAG_VALUES.id);
          //   }
          // );
        },
        onSettled: () => {
          // queryClient.invalidateQueries({queryKey: [GET_USER_TASK_TAGS_QUERY_KEY]});
        },
      }
    );
    // mutateCreateTag({
    //   value: '',
    //   color: '#ccc',
    // });
  };

  const handleDeleteTag = (id: string) => {
    setTargetTagId(id);
    mutateDeleteTag(id);
  };

  const handleTagBlur = (id: string, newValue: string) => {
    mutateUpdateTag(
      { id, value: newValue },
      {
        onError: () => {
          queryClient.invalidateQueries({
            queryKey: [GET_USER_TASK_TAGS_QUERY_KEY],
          });
        },
      }
    );
  };

  const handleTagChangeColor = (id: string, newColor: string) => {
    mutateUpdateTag(
      { id, color: newColor },
      {
        onError: () => {
          queryClient.invalidateQueries({
            queryKey: [GET_USER_TASK_TAGS_QUERY_KEY],
          });
        },
      }
    );
  };

  return (
    <div>
      <div className="mb-4 lg:mb-8">
        <h1 className="text-2xl font-medium">Settings</h1>
      </div>
      <Tabs defaultValue="tags" className="w-[400px]">
        <TabsList className="mb-6">
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="tags">
          <p className="mb-4 inline-flex items-center gap-x-2 text-lg font-medium">
            You can change or add new tags
            <CstmTooltip label="Tags assigned to a task will be removed from task when you delete the tag.">
              <Info size={20} />
            </CstmTooltip>
          </p>
          <div className="mb-6 grid gap-y-1.5">
            {userTags.map((tag) => (
              <div
                className={cn(
                  'grid grid-cols-[24px_1fr_24px] items-center gap-x-3 capitalize',
                  isPendingDeletingTag && targetTagId === tag.id
                    ? 'pointer-events-none opacity-70'
                    : ''
                )}
                key={tag.id}
              >
                <ColorPicker
                  background={tag.color as string}
                  setBackground={(color) => handleTagColorChange(tag.id, color)}
                  onClose={() => handleTagChangeColor(tag.id, tag.color)}
                />
                <Input
                  type="text"
                  value={tag.value}
                  onChange={(e) => handleTagChange(tag.id, e.target.value)}
                  onBlur={(e) => handleTagBlur(tag.id, e.target.value)}
                  className="rounded border p-1"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteTag(tag.id)}
                  disabled={isPendingDeletingTag || targetTagId === tag.id}
                >
                  {isPendingDeletingTag && targetTagId === tag.id ? (
                    <Loader />
                  ) : (
                    <Trash />
                  )}
                </Button>
              </div>
            ))}
            <Button className="mt-2" onClick={handleAddTag}>
              Add a new tag
            </Button>
          </div>
          <div className="flex items-center justify-between">
            {/* <Button onClick={toggleEditMode}>Edit tags</Button> */}
            {/* {editMode && (
              <Button onClick={onCreateUserTags}>Save chandges</Button>
            )} */}
          </div>
        </TabsContent>
        <TabsContent value="password">{/* <PickerExample /> */}</TabsContent>
      </Tabs>
    </div>
  );
}
