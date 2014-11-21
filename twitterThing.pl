#!/usr/bin/perl

use strict;
use warnings;
use Net::Twitter;
use Scalar::Util 'blessed';
use Data::Dumper;

my $nt = Net::Twitter->new(
    traits   => [qw/API::RESTv1_1/],
    consumer_key        => 'iHaUa7TwDWlO7GDCxY1tG8zQD',
    consumer_secret     => 'c78yTnWklalEcQT8NvkbSI4maB07J9uZ6K94UcyFhrfMVkUrn1',
    access_token        => '364339991-N6lMmW8y80zHwWZHn51QQYMuuBGoO3ZoEL43KZfA',
    access_token_secret => 'MN4rMgcGeQKXRaPgEyMm756M0BwtANdLIyZgddJWmY8xu',
    ssl                 => 1,
);

my $result = $nt->search( {q=>'heypano', since_id => 123123123, count => 100 });
print Dumper($result);
exit 1;
eval {
    my $statuses = $nt->friends_timeline({ since_id => "heypano", count => 100 });
    for my $status ( @$statuses ) {
        print "$status->{created_at} <$status->{user}{screen_name}> $status->{text}\n";
    }
};
if ( my $err = $@ ) {
    die $@."\n" unless blessed $err && $err->isa('Net::Twitter::Error');

    warn "HTTP Response Code: ", $err->code, "\n",
         "HTTP Message......: ", $err->message, "\n",
         "Twitter error.....: ", $err->error, "\n";
}
