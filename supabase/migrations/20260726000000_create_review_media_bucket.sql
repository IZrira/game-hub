-- Create 'review-media' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('review-media', 'review-media', true)
on conflict (id) do nothing;

-- Create policy to allow public viewing
create policy "Public Access"
on storage.objects for select
to public
using ( bucket_id = 'review-media' );

-- Create policy to allow authenticated users to upload
create policy "Authenticated users can upload media"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'review-media' );

-- Create policy to allow authenticated users to update their own media
create policy "Users can update own media"
on storage.objects for update
to authenticated
using ( bucket_id = 'review-media' and auth.uid() = owner );

-- Create policy to allow authenticated users to delete their own media
create policy "Users can delete own media"
on storage.objects for delete
to authenticated
using ( bucket_id = 'review-media' and auth.uid() = owner );
