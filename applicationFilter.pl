#!/usr/bin/perl

use strict;
use warnings;
use Data::Dumper;

# Saving a new application filter
#  SF::UI::PJB::ObjectManager::SimpleObject::saveObject ->EOHandler::storeObject
# Figure out where the appEntries are loaded from
# also gl ApplicationFilter
my $applicationFilterEO = 
{
    'data' => {
        'appEntries' => [
            {
                'filter' => undef,
                'name'   =>
'Risks:Low Types:Client Application Business Relevance:Low Categories:download manager Tags:adds/installs other software',
                'productivities' => [
                    {
                        'count'        => 0,
                        'name'         => 'Low',
                        'productivity' => 2
                    }
                ],
                'risks' => [
                    {
                        'count' => 0,
                        'name'  => 'Low',
                        'risk'  => 2
                    }
                ],
                'tags' => [
                    {
                        'count'   => 0,
                        'tagId'   => 46,
                        'tagName' => 'adds/installs other software',
                        'tagType' => 'tag'
                    },
                    {
                        'count'   => 0,
                        'tagId'   => 45,
                        'tagName' => 'download manager',
                        'tagType' => 'category'
                    }
                ],
                'type'  => 'filter',
                'types' => [
                    {
                        'count' => 0,
                        'name'  => 'Client Application',
                        'type'  => 'isClient'
                    }
                ],
                'value' => ''
            },
            {
                'filter' => undef,
                'name'   =>
'Risks:Low Types:Client Application Business Relevance:Low Categories:download manager',
                'productivities' => [
                    {
                        'count'        => 1,
                        'name'         => 'Low',
                        'productivity' => 2
                    }
                ],
                'risks' => [
                    {
                        'count' => 1,
                        'name'  => 'Low',
                        'risk'  => 2
                    }
                ],
                'tags' => [
                    {
                        'count'   => 1,
                        'tagId'   => 45,
                        'tagName' => 'download manager',
                        'tagType' => 'category'
                    }
                ],
                'type'  => 'filter',
                'types' => [
                    {
                        'count' => 1,
                        'name'  => 'Client Application',
                        'type'  => 'isClient'
                    }
                ],
                'value' => ''
            },
            {
                'filter'         => undef,
                'name'           => 'Types:Client Application',
                'productivities' => [],
                'risks'          => [],
                'tags'           => [],
                'type'           => 'filter',
                'types'          => [
                    {
                        'count' => 470,
                        'name'  => 'Client Application',
                        'type'  => 'isClient'
                    }
                ],
                'value' => ''
            },
            {
                'decrypted_only_detector' =>
                  bless( do { \( my $o = 0 ) }, 'JSON::XS::Boolean' ),
                'filter'         => '',
                'name'           => '5by5 Radio',
                'productivities' => [
                    {
                        'count'        => 0,
                        'name'         => 'Low',
                        'productivity' => 2
                    }
                ],
                'risks' => [
                    {
                        'count' => 0,
                        'name'  => 'Medium',
                        'risk'  => 3
                    }
                ],
                'tags'  => [],
                'type'  => 'app',
                'types' => [
                    {
                        'count' => 0,
                        'name'  => 'Client Application',
                        'type'  => 'isClient'
                    },
                    {
                        'count' => 0,
                        'name'  => 'Web Application',
                        'type'  => 'isWebApp'
                    }
                ],
                'value' => '2218'
            }
        ],
        'name' => 'TestFilter'
    },
    'uuid' => '6727b41a-22f9-11e4-a8f2-b6efe9c23f38'
};


{
    "key" => undef,
    "something" => "else",
};

{
    "key" => [],
    "something" => "else",
};

{
    "something" => "else",
};

printKeys($applicationFilterEO, '');

sub printKeys{
    my ($thing, $space) = @_;
    if(ref $thing eq 'HASH'){
        for(sort {$a cmp $b} keys %$thing){
            if(ref $thing->{$_} eq 'ARRAY'){
                print "$space$_\[\]\n";                
            }else{
                print "$space$_\n";
            }
            printKeys($thing->{$_}, $space.'  ');
        }
    }elsif(ref $thing eq 'ARRAY'){
        if(scalar(@$thing) > 0){
            $thing = $thing->[0];
            printKeys($thing, $space.'  ');
        }
    }
}
