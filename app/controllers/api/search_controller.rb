class Api::SearchController < ApplicationController

  def index
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])
      .per(20)
  end

end
