define(function ()
{
    function tag (source)
    {
        for (var key in source) {
            this[key] = source[key];
        }
    };

    tag.prototype.getTagName = function ()
    {
        return this._content || this.clean;
    }

    tag.prototype.getCategoryName = function(key)
    {
        return this.getCategories()[key];
    }

    tag.prototype.getCategories = function()
    {
        return {
            'website': 'All',
            'animalcreaturecakes': 'Animal / Creature Cakes',
            'anniversaries': 'Anniversaries',
            'bottles': 'Bottles',
            'cakesforboys': 'Cakes for Boys',
            'cakesforgirls': 'Cakes for Girls',
            'cakesforladies': 'Cakes for Ladies',
            'cakesformen': 'Cakes for Men',
            'cakesforteenagers': 'Cakes for Teenagers',
            'careerthemedcakes': 'Career Themed Cakes',
            'castles': 'Castles',
            'charactercakes': 'Character Cakes',
            'charitycakes': 'Charity Cakes',
            'childrensbirthdaycakes': 'Childrens Birthday Cakes',
            'christeningcakes': 'Christening Cakes',
            'christmascakes': 'Christmas Cakes',
            'comingofagecakes': 'Coming Of Age Cakes',
            'cupcakes': 'Cupcakes',
            'dance': 'Dance',
            'decades30th40th50th': 'Decades 30th / 40th / 50th',
            'decades60th70th80th': 'Decades 60th / 70th / 80th',
            'disneycakes': 'Disney Cakes',
            'gamesvideogames': 'Games / Video Games',
            'hobbies': 'Hobbies',
            'justcakes': 'Just Cakes',
            'leisure': 'Leisure',
            'movies': 'Movies',
            'musical': 'Musical',
            'numbercakes': 'Number Cakes',
            'personalisedcakes': 'Personalised Cakes',
            'picturecakes': 'Picture Cakes',
            'popstars': 'Pop Stars',
            'randomcakes': 'Random Cakes',
            'retirementcakes': 'Retirement Cakes',
            'retrocakes': 'Retro Cakes',
            'seasonsevents': 'Seasons / Events',
            'sportingcakes': 'Sporting Cakes',
            'topsyturvycakes': 'Topsy Turvy Cakes',
            'tv': 'TV',
            'vehiclecakes': 'Vehicle Cakes',
            'weddingcakes': 'Wedding Cakes',
            'xxxadultcakes': 'XXX Adult Cakes',
        }
    }

    return tag;
});