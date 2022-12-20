require 'aws-sdk'
require 'fog-aws'

module Functions::WebResume::DeployHelper
  def self.restore_secrets(secret)
    result = ""
    secret.split('').each { |c| 
      result = result + (c.ord + 1).chr
    }
    return result
  end

  # not Tracy's s3 secrets
  AWS_ACCESS_KEY_ID = ENV['AWS_ACCESS_KEY_ID']
  AWS_SECRET_ACCESS_KEY = ENV['AWS_SECRET_ACCESS_KEY']
  REGION_ID = ENV['REGION_ID']
  BUCKET_NAME = ENV['BUCKET_NAME']
=begin
  # Lists the available Amazon S3 buckets.
  #
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @example
  #   list_buckets(Aws::S3::Client.new(region: 'us-east-1'))
  def self.list_buckets(s3_client)
    response = s3_client.list_buckets
    if response.buckets.count.zero?
      puts 'No buckets.'
    else
      response.buckets.each do |bucket|
        puts bucket.name
      end
    end
  rescue StandardError => e
    puts "Error listing buckets: #{e.message}"
  end

=end

  # Creates a bucket in Amazon S3.
  #
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @return [Boolean] true if the bucket was created; otherwise, false.
  # @example
  #   exit 1 unless bucket_created?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket'
  #   )
  def self.bucket_created?(s3_client, bucket_name)
    response = s3_client.create_bucket(bucket: bucket_name)
    if response.location == '/' + bucket_name
      return true
    else
      return false
    end
  rescue StandardError => e
    puts "Error creating bucket: #{e.message}"
    # return false
  end
  # Uploads an object to a bucket in Amazon S3.
  #
  # Prerequisites:
  #
  # - An Amazon S3 bucket.
  #
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @param object_key [String] The name of the object.
  # @param object_content [String] The content to add to the object.
  # @return [Boolean] true if the object was uploaded; otherwise, false.
  # @example
  #   exit 1 unless object_uploaded?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     'my-file.txt',
  #     'This is the content of my-file.txt.'
  #   )
  def self.object_uploaded?(s3_client, bucket_name, object_key, object_content)
    response = s3_client.put_object(bucket: bucket_name,
      key: object_key,
      body: object_content,
      acl: 'public-read'
    )
    # if response.etag
    #   return true
    # else
    #  return false
    # end
    return true
  rescue StandardError => e
    puts "Error uploading object: #{e.message}"
    # return false
  end

  # Add bucket policy: PublicReadGetObject
  def self.bucket_policy_added?(s3_client, bucket_name)
    bucket_policy = {
      "Version": '2012-10-17',
      "Statement": [
        {
          "Sid": 'PublicReadGetObject',
          "Effect": 'Allow',
          "Principal": '*',
          "Action": 's3:GetObject',
          "Resource": "arn:aws:s3:::#{bucket_name}/*"
        }
      ]
    }.to_json
    s3_client.put_bucket_policy(
      bucket: bucket_name,
      policy: bucket_policy
    )
    return true
  rescue StandardError => e
    puts "Error adding bucket policy: #{e.message}"
    # return false
  end

  def self.object_acl_set?(s3_client, bucket_name, object_key)
    s3_client.put_object_acl(bucket: bucket_name,
      key: object_key,
      acl: 'public-read'
    )
    return true
  rescue StandardError => e
    puts "Error setting object ACL: #{e.message}"
    # return false
  end


  # For default demo: call upload_to_s3(local_path, '', unique_id)
  def self.upload_to_s3(local_path, region_id, bucket_name)
    bucket_name = "webzero-it2-" + bucket_name
    bucket_name = bucket_name.sub('_', '-')
    # TODO: ensure the bucket name is valid
    region_id = REGION_ID
    puts bucket_name

    aws_key = restore_secrets(AWS_ACCESS_KEY_ID)
    aws_key_sec = restore_secrets(AWS_SECRET_ACCESS_KEY)

    credentials = Aws::Credentials.new(
      aws_key,
      aws_key_sec
      )

    s3_client = Aws::S3::Client.new(
          region: region_id,
          credentials: credentials
      )

    bucket_create = self.bucket_created?(s3_client, bucket_name)
    puts "bucket created: #{bucket_create}"
    bucket_add_policy = self.bucket_policy_added?(s3_client, bucket_name)
    puts "bucket policy added: #{bucket_add_policy}"

    Dir.glob(local_path + '/**/*').each do |filename|
      next if File.directory?(filename)

      puts filename
      bucket_file_name = filename[local_path.length+1..]
      puts bucket_file_name
      # set acl to 'public-read'
      mime = MIME::Types.type_for(bucket_file_name).first
      mime_type = 'text/plain'
      if mime != nil
        mime_type = mime.content_type
      end
      puts mime_type
      s3_client.put_object(acl: 'public-read', bucket: bucket_name, 
        key: bucket_file_name, body: IO.read(filename),
        :content_type => mime_type)
      puts "Successfully uploaded #{filename}"
    end

    storage = Fog::Storage.new({
      :provider   => 'AWS',
      :aws_access_key_id => aws_key,
      :aws_secret_access_key => aws_key_sec,
      :region => region_id
    })

    if storage.kind_of?(Fog::Storage::AWS::Real)
      storage.put_bucket_website(bucket_name, :IndexDocument => 'index.html')
    end

    # puts "https://#{bucket_name}.s3.amazonaws.com/output_local/index.html"
    # # https://webzero-test.s3.amazonaws.com/output_local/index.html
    return "http://#{bucket_name}.s3-website-us-east-1.amazonaws.com"
  end
end
